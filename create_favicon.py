from PIL import Image

try:
    img = Image.open("assets/logo.png")
    width, height = img.size
    
    # Calculate new square size (max dimension)
    new_size = max(width, height)
    
    # Create new transparent image
    new_img = Image.new("RGBA", (new_size, new_size), (0, 0, 0, 0))
    
    # Paste original image in center
    offset_x = (new_size - width) // 2
    offset_y = (new_size - height) // 2
    new_img.paste(img, (offset_x, offset_y))
    
    # Save as favicon.png
    new_img.save("assets/favicon.png")
    print("Favicon created successfully: assets/favicon.png")
    
except Exception as e:
    print(f"Error: {e}")
