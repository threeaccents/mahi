defmodule Mahi.Mailer do
  use Swoosh.Mailer, otp_app: :mahi

  require Logger

  def deliver_with_logging(mail) do
    case deliver(mail) do
      {:ok, _} ->
        {:ok, mail}

      {:error, reason} ->
        Logger.error("""
        Email delivery failed:
        Subject: #{mail.subject}
        To: #{inspect(mail.to)}
        Reason: #{inspect(reason, pretty: true)}
        """)

        {:error, reason}
    end
  end
end
