import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				about: resolve(__dirname, 'aboutus.html'),
				contact: resolve(__dirname, 'contact.html'),
				login: resolve(__dirname, 'login.html'),
				order: resolve(__dirname, 'order.html'),
				mlbb: resolve(__dirname, 'mlbb.html')
			}
		}
	}
})
