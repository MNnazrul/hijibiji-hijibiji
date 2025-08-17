To remove the old version of the AppImage from `/opt` (or any other location), follow these steps:

### 1. **Identify the Old Version**

If you’ve already renamed or moved the old version, it will be easy to identify. If not, you can still check the file name (e.g., `cursor.appimage`) and verify which one is the old version by its creation or modification time.

### 2. **Remove the Old AppImage**

To delete the old version of the AppImage, run the following command:

```bash
sudo rm /opt/cursor.appimage.old
```

If you didn’t rename the old version, and it’s still named `cursor.appimage`, then:

```bash
sudo rm /opt/cursor.appimage
```

### 3. **Verify Removal**

Ensure that the old AppImage is removed by listing the contents of the `/opt` directory:

```bash
ls /opt
```

If you still see the old version, double-check the file name and path.

### 4. **Clear Any Related Files (Optional)**

If the AppImage created any configuration files, caches, or data folders in your home directory (typically in `~/.config` or `~/.local`), you can also remove those. For example:

```bash
rm -rf ~/.config/cursor-ide
rm -rf ~/.local/share/cursor-ide
```

This will remove the old version entirely. Let me know if you need help with other cleanup tasks!
