import { useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/react';
import { QRCodeCanvas } from 'qrcode.react';
import { jsPDF } from 'jspdf';

import { Layout, Box, Flex, Button, Text, WatchDetailCard, OwnershipHistoryCard } from '@components';
import { useTranslation, useRequireAuth } from '@hooks';
import { useGetWatchQuery } from '@generated';
import { Watch as WatchModel } from '@model';

export default function WatchDetail() {
  const { isReady, user } = useRequireAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const { serialNum } = router.query;

  const qrRef = useRef<HTMLCanvasElement>(null);

  const downloadQR = useCallback(() => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `watch-${serialNum}-qr.png`;
    a.click();
  }, [serialNum]);

  const cachedWatch = user?.watches?.find(
    (w) => w.serialNum === (serialNum as string)
  );

  const { data, previousData } = useGetWatchQuery({
    variables: { where: { serialNum: serialNum as string } },
    skip: !serialNum,
    fetchPolicy: 'cache-and-network',
  });

  const watchData = data?.watch ?? previousData?.watch;
  const watch = watchData ? new WatchModel(watchData as any) : cachedWatch;

  const downloadCertificate = useCallback(() => {
    if (!watch || !user) return;
    const doc = new jsPDF();
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();

    // Background
    doc.setFillColor(250, 250, 250);
    doc.rect(0, 0, w, h, 'F');

    // Header gradient band
    doc.setFillColor(0, 168, 132);
    doc.rect(0, 0, w, 55, 'F');
    // Darker accent strip at bottom of header
    doc.setFillColor(0, 140, 110);
    doc.rect(0, 50, w, 5, 'F');

    // Header text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('All-E', w / 2, 25, { align: 'center' });
    doc.setFontSize(13);
    doc.setFont('helvetica', 'normal');
    doc.text(t('certificate.subtitle'), w / 2, 40, { align: 'center' });

    // Decorative line under header
    doc.setDrawColor(0, 168, 132);
    doc.setLineWidth(0.5);
    doc.line(30, 65, w - 30, 65);

    // Serial number badge
    doc.setFillColor(0, 168, 132);
    doc.roundedRect(w / 2 - 35, 72, 70, 14, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`#${watch.serialNum}`, w / 2, 82, { align: 'center' });

    // Details section
    doc.setTextColor(60, 60, 60);
    let y = 105;
    const labelX = 35;
    const valueX = 100;
    const addRow = (label: string, value: string) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(130, 130, 130);
      doc.text(label, labelX, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(40, 40, 40);
      doc.text(value, valueX, y);
      // Subtle separator
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.3);
      doc.line(labelX, y + 4, w - 35, y + 4);
      y += 14;
    };

    if (watch.brand) addRow(t('watchRegistry.brand'), watch.brand);
    if (watch.model) addRow(t('watchRegistry.model'), watch.model);
    if (watch.referenceNumber) addRow(t('watchRegistry.referenceNumber'), watch.referenceNumber);
    if (watch.yearOfProduction) addRow(t('watchRegistry.yearOfProduction'), String(watch.yearOfProduction));
    addRow(t('seeAWatch.currentOwner'), user.username);
    addRow(t('certificate.date'), new Date().toLocaleDateString());

    // IPFS section
    if (watch.metadataURI) {
      y += 4;
      doc.setFillColor(240, 248, 245);
      doc.roundedRect(labelX - 5, y - 6, w - 60, 16, 2, 2, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 140, 110);
      doc.text('IPFS', labelX, y + 2);
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(7);
      doc.text(watch.metadataURI, labelX + 20, y + 2);
      y += 16;
    }

    // QR code section
    const canvas = qrRef.current;
    if (canvas) {
      const qrData = canvas.toDataURL('image/png');
      // QR background card
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.5);
      doc.roundedRect(w / 2 - 28, y - 2, 56, 56, 4, 4, 'FD');
      doc.addImage(qrData, 'PNG', w / 2 - 22, y + 4, 44, 44);
      y += 60;
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('Scan to verify ownership', w / 2, y, { align: 'center' });
    }

    // Footer
    doc.setFillColor(0, 168, 132);
    doc.rect(0, h - 18, w, 18, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('All-E Watch Registry', w / 2, h - 8, { align: 'center' });

    doc.save(`certificate-${watch.serialNum}.pdf`);
  }, [watch, user, t]);

  if (!isReady || !user || !serialNum) return null;

  if (!watch) {
    return (
      <Layout>
        <Flex direction="column" align="center" justify="center" minH="50vh" gap={4}>
          <Text color={{ base: 'gray.500', _dark: 'gray.500' }} fontSize="lg">{t('dashboard.watchNotFound')}</Text>
          <Button color="white" className="brand-gradient-bg" onClick={() => router.push('/')}>
            {t('dashboard.backToDashboard')}
          </Button>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex direction="column" gap={6} className="fade-in-up">
        <Flex justify="space-between" align="center">
          <Heading size="2xl" className="gradient-text" letterSpacing="tight">
            {t('seeAWatch.ownershipOfAWatch')}
          </Heading>
          <Flex gap={3}>
            <Button
              variant="outline"
              color="#00a884"
              borderColor="#00a884"
              onClick={downloadCertificate}
            >
              {t('certificate.download')}
            </Button>
            <Button
              variant="outline"
              color="#00a884"
              borderColor="#00a884"
              onClick={() => router.push('/transfer-watch')}
            >
              {t('transferAWatchButton')}
            </Button>
          </Flex>
        </Flex>

        <WatchDetailCard
          watch={watch}
          ownerUsername={user.username}
          isCurrentUserOwner
        />

        <OwnershipHistoryCard entries={watchData?.ownershipLog ?? []} />

        <Box
          className="soft-card"
          bg={{ base: 'white', _dark: 'gray.800' }}
          p={6}
          borderRadius="lg"
          boxShadow={{ base: 'sm', _dark: 'none' }}
        >
          <Text color={{ base: 'gray.900', _dark: 'white' }} fontWeight="bold" fontSize="lg" mb={4}>
            {t('qrCode.title')}
          </Text>
          <Flex direction="column" align="center" gap={3}>
            <Box bg="white" p={3} borderRadius="md">
              <QRCodeCanvas
                ref={qrRef}
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/check-ownership?serialNum=${serialNum}`}
                size={180}
                level="H"
              />
            </Box>
            <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm" textAlign="center">
              {t('qrCode.description')}
            </Text>
            <Button
              size="sm"
              variant="outline"
              color="#00a884"
              borderColor="#00a884"
              onClick={downloadQR}
            >
              {t('qrCode.download')}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
}
