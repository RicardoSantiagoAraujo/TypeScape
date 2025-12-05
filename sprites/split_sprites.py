from PIL import Image
import imageio
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
    paths = {}
    for row in range(sprites_per_row):
        paths[row] = {}
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
            file_path = os.path.join(output_dir, sprite_name)
            sprite.save(file_path)
            paths[row][col] = file_path
            print(f"Saved: {sprite_name}")
    # Save original sheet to new directory as well
    sprite_sheet.save(os.path.join(output_dir, f"{config["name"]}.png"))
    # Create gifs
    for key, value in paths.items():
        create_gif(key, value)


def create_gif(i, dict):
    # Create a list to store images
    images = []

    # Open each PNG and append to the images list
    for filepath in dict.values():
        images.append(imageio.imread(filepath))
    output_dir_extended = os.path.join(output_dir, "gif/")
    output_path = os.path.join(output_dir_extended, f'{config["name"] + config["row_suffix"][i]}.gif')
    duration = 0.5  # Duration of each frame in the gif
    # Save images as a gif
    os.makedirs(output_dir_extended, exist_ok=True)
    imageio.mimsave(output_path, images, duration=duration, loop=0)
    print(f"Created GIF : {output_path}")

if __name__ == "__main__":
    # Define parameters
    sprite_ids=["dragonite", "pikachu", "psyduck", "raichu","ditto","mewtwo", "ninetails","farfetchd","gengar","snorlax","jigglypuff", "magikarp"]

    # Call the function to slice the sprite sheet
    for sprite_id in sprite_ids:

        sprite_sheet_path = f"./sprites/pokemon_sprites/{sprite_id}.png"
        sprites_per_row = 4
        sprites_per_col = 4
        output_dir = f"./sprites/output_sprites/{sprite_id}"
        output_dir = f"./app/assets/img/characters/{sprite_id}"
        config = configs[sprite_id]
        # Create output directory if it doesn't exist
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        slice_sprite_sheet(sprite_sheet_path, sprites_per_row, sprites_per_col, output_dir, config)
