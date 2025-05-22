# mood.exe
a cross-platform desktop app that prompts you to log your mood at regular intervals. when prompted, you choose between three options: sad, neutral, and happy. you can also optionally add an entry as to why you're feeling that way. all your logs are stored in a single `mood.json` file in the `$DOCUMENTS` folder.

## syncing
if you want to sync your logs across devices, feel free to use something like iCloud or OneDrive in the folder that `mood.json` is sitting in.

## how i built this
i used tauri which is like electron but a LOT more lighter and uses rust for its backend!
