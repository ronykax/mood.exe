use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager, WebviewUrl, WebviewWindowBuilder,
};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn hide_window() {
    
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let settings = MenuItem::with_id(app, "settings", "Settings", true, None::<&str>)?;
            let data = MenuItem::with_id(app, "data", "Data", true, None::<&str>)?;

            let menu = Menu::with_items(app, &[&quit, &settings, &data])?;

            let _ = TrayIconBuilder::new()
                .show_menu_on_left_click(false)
                .tooltip("mood.exe")
                .menu(&menu)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "quit" => {
                        app.exit(0);
                    }
                    "settings" => {
                        WebviewWindowBuilder::new(
                            app,
                            "settings".to_string(),
                            WebviewUrl::App("/settings".into()),
                        )
                        .title("Settings")
                        .center()
                        .decorations(false)
                        .inner_size(450.0, 550.0)
                        .build()
                        .unwrap();
                    }
                    "data" => {
                        WebviewWindowBuilder::new(
                            app,
                            "data".to_string(),
                            WebviewUrl::App("/data".into()),
                        )
                        .title("Recent")
                        .center()
                        .decorations(false)
                        .inner_size(750.0, 600.0)
                        .build()
                        .unwrap();
                    }
                    _ => {
                        println!("menu item not handled!");
                    }
                })
                .on_tray_icon_event(|tray, event| match event {
                    TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } => {
                        println!("left click pressed and released");

                        let app = tray.app_handle();

                        if let Some(window) = app.get_webview_window("main") {
                            if window.is_visible().unwrap() {
                                window.hide().unwrap();
                            } else {
                                window.show().unwrap();
                                window.set_focus().unwrap();
                            }
                        }
                    }
                    _ => {
                    }
                })
                .icon(app.default_window_icon().unwrap().clone())
                .build(app)
                .unwrap();

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, hide_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
