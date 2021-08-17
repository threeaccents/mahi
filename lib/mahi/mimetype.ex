defmodule Mahi.Mime do
  @moduledoc false

  def check_magic_bytes(<<137, 80, 78, 71, 13, 10, 26, 10, _::binary>>), do: {:image, :png}
  def check_magic_bytes(<<37, 80, 68, 70, 45, _::binary>>), do: {:image, :pdf}
  def check_magic_bytes(<<73, 73, 42, 0, _::binary>>), do: {:image, :tiff}
  def check_magic_bytes(<<77, 77, 0, 42, _::binary>>), do: {:image, :tiff}
  def check_magic_bytes(<<255, 216, 255, _::binary>>), do: {:image, :jpg}
  def check_magic_bytes(<<102, 116, 121, 112, 105, 115, 111, 109, _::binary>>), do: {:video, :mp4}
  def check_magic_bytes(<<73, 68, 51, _::binary>>), do: {:audio, :mp3}
  def check_magic_bytes(<<80, 75, 3, 4, _::binary>>), do: {:zip, :xlsx}
  def check_magic_bytes(<<0, 97, 115, 109, _::binary>>), do: {:application, :wasm}

  def check_magic_bytes(<<82, 73, 70, 70, _, _, _, _, 65, 86, 73, 32, _::binary>>),
    do: {:video, :avi}

  def check_magic_bytes(<<82, 73, 70, 70, _, _, _, _, 87, 69, 66, 80, _::binary>>),
    do: {:image, :webp}

  def check_magic_bytes(path) when is_binary(path) do
    with {:ok, file} <- :file.open(path, [:binary, :read]),
         {:ok, file_header_bytes} <- :file.read(file, 216) do
      check_magic_bytes(file_header_bytes)
    else
      {:error, _reason} -> {:application, :wasm}
    end
  end

  def check_magic_bytes(_), do: {:application, :octet_stream}
end
