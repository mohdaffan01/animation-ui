# Cursor Tail Animation

This is a system-wide, transparent background application that adds an animated trail to your mouse cursor across your entire screen!

## How to Start It
Since the app is built to run entirely in the background, you do not need the command prompt.

### 1. Manual Start
1. Go to `C:\Java-Script\demo\cursor-tail-design\dist\cursor-tail-win32-x64`.
2. Double-click the `cursor-tail.exe` application file.

*(Tip: You can right-click `cursor-tail.exe`, choose "Send to", and select "Desktop (create shortcut)" so you can start it quickly from your desktop!)*

### 2. Auto-Start (When Windows Boots Up)
The app is already added to your Windows **Startup Apps**, meaning it will automatically start every single time you turn on your PC. You don't need to do anything! 

---

## How to Stop It

Since it runs seamlessly in the background with no command prompt window, you must close it using one of these two simple methods:

### Method A: From the System Tray (The Easiest Way)
1. Look at the bottom-right corner of your screen (where your clock, Wi-Fi, and volume icons are).
2. Click the small **( ^ )** completely UP arrow to show hidden taskbar icons.
3. Look for a tiny square icon (it might just be a blank icon or the standard shape). If you hover your mouse over it, it will say **"Cursor Tail Animation"**.
4. **Right-click** that icon and select **Quit**.

### Method B: From Task Manager 
1. Press `Ctrl + Shift + Esc` on your keyboard to open the **Task Manager**.
2. Scroll through the "Processes" tab list until you find **`cursor-tail`** (or `cursor-tail.exe`).
3. Right-click on it and click **End task**.

---

## How to Stop It Opening When Windows Starts
If you *no longer* want it to load every time you log in to your PC:
1. Press `Win + R` on your keyboard to open the "Run" dialog box.
2. Type exactly `shell:startup` and hit Enter. This opens the secret Windows Autostart folder.
3. Find the `CursorTail` shortcut file in this folder and **Delete** it.
