FROM elixir:1.12.1 

RUN apt-get update -y

# Install libvips
RUN apt-get install -y libvips libvips-dev libvips-tools

WORKDIR /app

RUN mix deps.get  

CMD mix phx.server