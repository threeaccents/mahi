defmodule Mahi.Factory do
  @moduledoc false

  alias Faker.Person.En
  alias Mahi.Repo

  def build(:user_schema) do
    %Mahi.Accounts.UserSchema{
      first_name: En.first_name(),
      last_name: En.last_name(),
      email: En.first_name() <> En.last_name() <> "@mahi.com",
      hashed_password: Bcrypt.hash_pwd_salt("password")
    }
  end

  # Convenience API
  def build(factory_name, attributes) do
    factory_name |> build() |> struct!(attributes)
  end

  def insert!(factory_name, attributes \\ []) do
    factory_name |> build(attributes) |> Repo.insert!()
  end
end
