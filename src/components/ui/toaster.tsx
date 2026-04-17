"use client"

import {
  Toaster as ChakraToaster,
  ToastCloseTrigger,
  ToastDescription,
  ToastIndicator,
  ToastRoot,
  ToastTitle,
  createToaster,
} from "@chakra-ui/react"

export const toaster = createToaster({
  placement: "top-end",
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <ChakraToaster toaster={toaster}>
      {(toast) => (
        <ToastRoot>
          <ToastIndicator />
          <ToastTitle>{toast.title}</ToastTitle>
          {toast.description && (
            <ToastDescription>{toast.description}</ToastDescription>
          )}
          <ToastCloseTrigger />
        </ToastRoot>
      )}
    </ChakraToaster>
  )
}
