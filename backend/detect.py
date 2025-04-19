import sys

try:
    print("✅ detect.py запущен", file=sys.stderr)

    import json
    from ultralytics import YOLO

    if len(sys.argv) < 2:
        raise Exception("❌ Нет пути к изображению")

    image_path = sys.argv[1]
    print(f"📷 Путь к изображению: {image_path}", file=sys.stderr)

    model = YOLO("yolov8n.pt")
    print("📦 YOLO загружен", file=sys.stderr)

    results = model(image_path)
    boxes = results[0].boxes

    print(f"📊 Найдено боксов: {len(boxes)}", file=sys.stderr)

    if not boxes or boxes.cls is None:
        print(json.dumps({ "detected": [] }))
    else:
        classes = boxes.cls.tolist()
        names = results[0].names
        labels = [names[int(c)] for c in classes]
        print(json.dumps({ "detected": labels }))

except Exception as e:
    print(f"[🐍 Ошибка YOLO]: {str(e)}", file=sys.stderr)
    print(json.dumps({ "detected": [] }))
