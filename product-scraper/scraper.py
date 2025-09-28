import os
import requests
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

load_dotenv()

API_BASE_URL = os.getenv("API_BASE_URL")
API_USER_EMAIL = os.getenv("API_USER_EMAIL")
API_USER_PASSWORD = os.getenv("API_USER_PASSWORD")

def login_to_api():
    """Faz login na API para obter um token de acesso."""
    print("Fazendo login na API...")
    try:
        response = requests.post(f"{API_BASE_URL}/auth/login", json={
            "email": API_USER_EMAIL,
            "password": API_USER_PASSWORD
        })
        response.raise_for_status()  
        token = response.json().get("access_token")
        if not token:
            print("Erro: Token de acesso não encontrado na resposta.")
            return None
        print("Login bem-sucedido!")
        return token
    except requests.exceptions.RequestException as e:
        print(f"Erro ao fazer login: {e}")
        return None

def scrape_product_data(page_path):
    """Usa o Selenium para extrair dados da página HTML local."""
    print("Iniciando o scraping do produto...")
    # Configura o Selenium para usar o Chrome, gerenciando o driver automaticamente
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Roda o Chrome em segundo plano, sem abrir uma janela
    options.add_argument("--disable-gpu")
    
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
    
    try:
        driver.get(f"file:///{page_path}")

        # Extrai os dados usando seletores
        name = driver.find_element(By.ID, "product-name").text
        description = driver.find_element(By.CLASS_NAME, "description").text
        price_text = driver.find_element(By.CLASS_NAME, "price").text
        image_url = driver.find_element(By.TAG_NAME, "img").get_attribute("src")

        # Limpa e formata o preço
        price = float(price_text.replace("R$", "").replace(",", ".").strip())
        
        product_data = {
            "name": name,
            "description": description,
            "price": price,
            "imageUrl": image_url
        }
        
        print("Scraping concluído com sucesso!")
        return product_data
    finally:
        driver.quit() # Sempre fecha o navegador

def save_product_to_api(product_data, token):
    """Salva os dados do produto na API usando o token de acesso."""
    print(f"Enviando produto '{product_data['name']}' para a API...")
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.post(f"{API_BASE_URL}/products", json=product_data, headers=headers)
        response.raise_for_status()
        print("Produto salvo com sucesso na API!")
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Erro ao salvar produto: {e}")
        print("Resposta do servidor:", e.response.text if e.response else "N/A")
        return None

if __name__ == "__main__":
    
    access_token = login_to_api()

    if access_token:
        html_file_path = os.path.abspath("mock_page.html")
        
        scraped_data = scrape_product_data(html_file_path)

        if scraped_data:
            save_product_to_api(scraped_data, access_token)