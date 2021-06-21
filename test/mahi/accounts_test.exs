defmodule Mahi.AccountsTest do
  use Mahi.DataCase

  alias Mahi.Factory
  alias Mahi.Accounts

  describe "authenticate/2" do
    test "token is returned if creds exist" do
      user_password = "topsecretcream"

      user = Factory.insert!(:user_schema, hashed_password: Bcrypt.hash_pwd_salt(user_password))

      assert {:ok, _token} = Accounts.authenticate(user.email, user_password)
    end

    test "invalid credentials if email is invalid" do
      user_password = "topsecretcream"

      Factory.insert!(:user_schema, hashed_password: Bcrypt.hash_pwd_salt(user_password))

      assert {:error, :invalid_credentials} =
               Accounts.authenticate("wrongemail@email.com", user_password)
    end

    test "invalid credentials if password is invalid" do
      user = Factory.insert!(:user_schema)

      assert {:error, :invalid_credentials} = Accounts.authenticate(user.email, "wrongpassword")
    end
  end
end
