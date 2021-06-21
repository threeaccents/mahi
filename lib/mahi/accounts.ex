defmodule Mahi.Accounts do
  alias Mahi.Repo

  alias Mahi.Accounts.UserSchema

  def authenticate(email, password) when is_binary(email) and is_binary(password) do
    with {:ok, user_schema} <- get_by_email(email),
         :ok <- validate_user_password(user_schema, password),
         {:ok, token, _} <- MahiWeb.Guardian.encode_and_sign(user_schema) do
      {:ok, token}
    else
      {:error, :invalid_credentials} -> {:error, :invalid_credentials}
      {:error, :not_found} -> {:error, :invalid_credentials}
    end
  end

  defp get_by_email(email) do
    case Repo.get_by(UserSchema, email: email) do
      nil -> {:error, :not_found}
      user -> {:ok, user}
    end
  end

  defp validate_user_password(user, password) do
    if Bcrypt.verify_pass(password, user.hashed_password) do
      :ok
    else
      {:error, :invalid_credentials}
    end
  end
end
