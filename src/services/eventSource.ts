/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fetchEventSource,
  type EventSourceMessage,
} from "@microsoft/fetch-event-source";

// import { userToken } from "@/common/user";

interface ChatEventParams {
  params: object;
  onOpen?: () => void;
  onStart?: () => void;
  onReachLimit?: () => void;
  onAttachment?: (attachment: unknown) => void;
  onAuthError?: (message?: string) => void;
  onEvent?: (content: string, code?: number) => void;
  onComplete?: (summary: unknown) => void;
  onError?: (code?: number, message?: unknown) => void;
}

export const createChatEvent = ({
  params,
  onStart,
  onOpen,
  onReachLimit,
  onAttachment,
  onAuthError,
  onEvent,
  onComplete,
  onError,
}: ChatEventParams) => {
  //   const authToken = userToken.value;

  const appLang = "English";

  const translateLang = "Chinese";

  const url = `https://openrouter.ai/api/v1/chat/completions`;
  const ctrl = new AbortController();

  onStart?.();

  const questionParams: any = {
    ...params,
  };

  fetchEventSource(`${url}`, {
    method: "POST",
    body: JSON.stringify(questionParams),
    // mode: 'no-cors',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
    },
    onopen: async (response) => {
      if (!response.ok) {
        ctrl.abort();
        onError?.(500, response.text());
      } else {
        onOpen?.();
      }
    },
    onmessage: (ev: EventSourceMessage) => {
      if (ev.data === "[DONE]") {
        ctrl.abort();
        onComplete?.(ev.data);
        return;
      }

      if (ev.data) {
        const obj = JSON.parse(ev.data);
        onEvent?.(obj.choices[0].delta.content);
      }

      //console.log('onmessage')
      //console.log(ev)
      // if (ev.event === "error_event") {
      //   onError?.(obj.code, obj?.error_message);
      //   ctrl.abort();
      //   return;
      // }
      // if (obj) {
      //   switch (obj.code) {
      //     case 1000:
      //       ctrl.abort();
      //       onComplete?.(obj.data);
      //       break;
      //     case 999:
      //       ctrl.abort();
      //       onReachLimit?.();
      //       break;
      //     case 800:
      //       onAttachment?.(obj.data);
      //       break;
      //     case 1401:
      //       ctrl.abort();
      //       onAuthError?.(obj.data);
      //       break;
      //     default:
      //       onEvent?.(obj.data || "", obj.code);
      //   }
      // }
    },
    onerror: (err) => {
      console.log("eventSource onerror", err);
      onError?.();
      ctrl.abort();
    },
    onclose: () => {
      ctrl.abort();
    },
    openWhenHidden: true,
    signal: ctrl.signal,
  });

  return {
    close: () => {
      ctrl.abort();
    },
  };
};
