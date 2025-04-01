import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
         <Alert>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{message.success}</AlertDescription>
        </Alert>
      )}
      {"error" in message && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message.error}</AlertDescription>
        </Alert>
      )}
      {"message" in message && (
        <Alert>
          <AlertDescription>{message.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
