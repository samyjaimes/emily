from http.server import BaseHTTPRequestHandler
from datetime import now

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        current_time = now()
        message = "Current date and time : " + current_time
        self.wfile.write(message.encode())
        return
