from PIL import Image
import os
from sprites.configs import configs

def slice_sprite_sheet(sprite_sheet_path, sprites_per_row, sprites_per_col, output_dir, config):
    # Open the sprite sheet
    sprite_sheet = Image.open(sprite_sheet_path)
    sheet_width, sheet_height = sprite_sheet.size

    # Calculate how many sprites are in the sheet
    sprite_width = sheet_width // sprites_per_row
    sprite_height = sheet_height // sprites_per_col

    # Loop through each sprite and save it as a separate PNG
    for row in range(sprites_per_row):
        for col in range(sprites_per_col):
            left = col * sprite_width
            upper = row * sprite_height
            right = left + sprite_width
            lower = upper + sprite_height

            # Crop the sprite
            sprite = sprite_sheet.crop((left, upper, right, lower))
            # Make adjustements
            ax = config["x_adjusts"]
            ay = config["y_adjusts"]
            sprite = sprite.crop((
                ax[row][col][0],
                ay[row][col][0],
                sprite_width - ax[row][col][1],
                sprite_height - ay[row][col][1],
                ))

            # Save the cropped sprite
            sprite_name = f"{config["name"]}{config["row_suffix"][row]}{config["col_suffix"][col]}.png"
            sprite.save(os.path.join(output_dir, sprite_name))
            print(f"Saved: {sprite_name}")
        sprite_sheet.save(os.path.join(output_dir, f"{config["name"]}.png"))


if __name__ == "__main__":
    # Define parameters
    sprite_id="farfetchd"
    sprite_sheet_path = f"./sprites/pokemon_sprites/{sprite_id}.png"
    sprites_per_row = 4
    sprites_per_col = 4
    output_dir = f"./sprites/output_sprites/{sprite_id}"
    config = configs[sprite_id]

    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Call the function to slice the sprite sheet
    slice_sprite_sheet(sprite_sheet_path, sprites_per_row, sprites_per_col, output_dir, config)
