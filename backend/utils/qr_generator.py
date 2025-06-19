import qrcode
from io import BytesIO

def generate_qr_code(data):
    qr = qrcode.make(data)
    buffer = BytesIO() 
    qr.save(buffer, format="PNG")
    return buffer.getvalue()

if __name__ == "__main__":
    test_data = "https://pypi.org/project/qrcode/"
    result = generate_qr_code(test_data)
    
    with open("test_qr.png", "wb") as f:
        f.write(result)
    print("QR Code generated as test_qr.png")    