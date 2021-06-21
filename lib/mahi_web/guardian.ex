defmodule MahiWeb.Guardian do
  @moduledoc false

  use Guardian, otp_app: :mahi

  alias Mahi.Accounts.User
  alias Mahi.Accounts.UserSchema
  alias Mahi.Repo

  def subject_for_token(%{id: _id} = user, _claims) do
    sub = to_string(user.id)
    {:ok, sub}
  end

  def resource_from_claims(%{"sub" => user_id}) do
    case UserSchema |> Repo.get(user_id) |> Repo.preload(:homes) do
      nil ->
        {:error, :invalid_token}

      user ->
        User.from_user_schema(%User{}, user)
    end
  end

  def resource_from_claims(_claims), do: {:error, "Unknown resource type"}
end
