#!/bin/sh

BIN="./bin/tailwindcss-linux-x64"
URL="https://github.com/tailwindlabs/tailwindcss/releases/download/v4.1.11/tailwindcss-linux-x64"

if [ ! -x "$BIN" ]; then
    echo "Downloading Tailwind CSS binary..."
    curl -L -o "$BIN" "$URL"
    chmod +x "$BIN"    
else
    echo "Found existing Tailwind CSS binary: $BIN"
fi

echo "Starting Tailwind watcher and static server..."

nohup "$BIN" -i ./input.css -o ./output.css --watch=always &
pid1=$!

npx serve -s . &
pid2=$!

trap 'echo "Stopping Tailwind and server..."; kill "$pid1" "$pid2"; exit 1' INT TERM
wait "$pid1" "$pid2"
