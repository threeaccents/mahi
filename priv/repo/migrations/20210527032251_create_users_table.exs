defmodule Mahi.Repo.Migrations.CreateUsersTable do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :first_name, :string, null: false
      add :last_name, :string, null: false
      add :email, :string, null: false
      add :hashed_password, :string, null: false
      add :confirmed_at, :utc_datetime

      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
