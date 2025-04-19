const express = require('express')
const multer = require('multer')
const cors = require('cors')
const { spawn } = require('child_process')
const path = require('path')

const app = express()
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

app.use(cors())
app.use(express.json())

app.post('/analyze', upload.single('image'), (req, res) => {
	const filePath = req.file.path.replace(/\\/g, "/");
	console.log('📸 Получено изображение:', filePath)

	const python = spawn('python', ['detect.py', filePath])

	let output = ''

	python.stdout.on('data', data => {
		output += data.toString()
	})

	python.stderr.on('data', data => {
		console.error('🐍 Python error:', data.toString())
	})

	python.on('close', () => {
		try {
			// ⚠️ Фильтруем только строку, где есть JSON
			const lines = output.split('\n')
			const jsonLine = lines.find(line => line.trim().startsWith('{'))

			if (!jsonLine) throw new Error('Нет валидного JSON')

			const parsed = JSON.parse(jsonLine)
			console.log('📤 Результат от YOLO:', parsed)
			res.json(parsed)
		} catch (err) {
			console.error('❌ Ошибка парсинга JSON:', err.message)
			res.status(500).send('Ошибка обработки изображения')
		}
	})
})

app.listen(5000, () => {
	console.log('🚀 YOLO-сервер запущен на http://localhost:5000')
})
