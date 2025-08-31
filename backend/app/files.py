from fastapi import File, UploadFile
from typing import List
import os
import shutil
from dotenv import load_dotenv

load_dotenv()

async def file_adder(media: List[UploadFile] = File(...)):
    base_dir = f"{os.getenv('BASE_ADD')}/data"
    images, videos = [], []

    # Separate by type
    for file in media:
        if file.content_type.startswith("image/"):
            images.append(file)
        elif file.content_type.startswith("video/"):
            videos.append(file)
        else:
            print(f"THis is a Error : {file.content_type}")

    dic = {"images": {}, "videos": {}}

    for cat, files in [("videos", videos), ("images", images)]:
        directory = f"{base_dir}/{cat}"
        os.makedirs(directory, exist_ok=True)

        file_count = sum(
            1 for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))
        )

        if len(files) == 0:
            continue  # skip if no new files

        dic[cat]["start"] = file_count

        for file in files:
            file_path = os.path.join(directory, f"{file_count}_{file.filename}")

            # Store the file
            with open(file_path, "wb") as buffer:
                contents = await file.read()
                buffer.write(contents)

            file_count += 1

        dic[cat]["end"] = file_count - 1
    print(f"File Dictionay :{dic}")
    return dic
