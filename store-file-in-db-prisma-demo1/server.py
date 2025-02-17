from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"  # Directory to store uploaded files
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Store uploaded files
files_db = []

@app.route("/upload", methods=["POST"])
def upload_file():
    data = request.json
    filename = data["filename"]
    content = data["content"]

    file_path = os.path.join(UPLOAD_FOLDER, filename)
    
    if content.startswith("data:"):  # If it's a base64 encoded file (like images, PDFs)
        import base64
        header, encoded = content.split(",", 1)
        with open(file_path, "wb") as f:
            f.write(base64.b64decode(encoded))
    else:  # Save text files
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

    # Store filename in "database"
    files_db.append(filename)

    return jsonify({"message": "File uploaded successfully!"})

@app.route("/files", methods=["GET"])
def get_files():
    return jsonify([{"filename": f} for f in files_db])

@app.route("/files/<filename>", methods=["GET"])
def download_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
