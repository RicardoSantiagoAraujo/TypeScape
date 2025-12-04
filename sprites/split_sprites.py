from PIL import Image
import os

def slice_sprite_sheet(sprite_sheet_path, sprite_width, sprite_height, output_dir):
    # Open the sprite sheet
    sprite_sheet = Image.open(sprite_sheet_path)
    sheet_width, sheet_height = sprite_sheet.size

    # Calculate how many sprites are in the sheet
    num_columns = sheet_width // sprite_width
    num_rows = sheet_height // sprite_height

    # Loop through each sprite and save it as a separate PNG
    for row in range(num_rows):
        for col in range(num_columns):
            left = col * sprite_width
            upper = row * sprite_height
            right = left + sprite_width
            lower = upper + sprite_height

            # Crop the sprite
            sprite = sprite_sheet.crop((left, upper, right, lower))

            # Save the cropped sprite
            sprite_name = f"sprite_{row}_{col}.png"
            sprite.save(os.path.join(output_dir, sprite_name))
            print(f"Saved: {sprite_name}")

if __name__ == "__main__":
    # Define parameters
    sprite_name="pikachu"
    sprite_sheet_path = f"./sprites/pokemon_sprites/{sprite_name}.png"
    sprite_width = 64  # Width of each individual sprite
    sprite_height = 64  # Height of each individual sprite
    output_dir = f"./sprites/output_sprites/{sprite_name}"

    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Call the function to slice the sprite sheet
    slice_sprite_sheet(sprite_sheet_path, sprite_width, sprite_height, output_dir)
