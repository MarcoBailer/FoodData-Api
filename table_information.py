import g4f

from g4f.client import Client

client = Client()

local_image = open("IMG-20250608-WA0006.jpg", "rb")
response_local = client.chat.completions.create(
    model=g4f.models.default_vision,
    messages=[
        {"role": "user", "content": "Leia conteudo da tabela INFORMAÇÃO NUTRICIONAL. Ignore conteúdo que não são da tabela. Coloque as informações no formato json. "
        """"
{
  "metadata": {
    "porcoes_por_embalagem": "quantidade de porções por embalagem",
    "porcao": "tamanho da porção (ex.: 13 ml, 50 g)"
    "porcao_em_100g": "tamanho da porção em 100 g"
  },
  "fator_nutricionais": {
    "valor_energetico": {
      "value_100g": "valor",
      "unit": "kcal"
    },
    "carboidratos": {
      "value_100g": "valor",
      "unit": "g"
    },
    "acucares_totais": {
      "value_100g": "valor",
      "unit": "g"
    },
    "acucares_adicionados": {
      "value_100g": "valor",
      "unit": "g"
    },
    "proteinas": {
      "value_100g": "valor",
      "unit": "g"
    },
    "gorduras_totais": {
      "value_100g": "valor",
      "unit": "g"
    },
    "gorduras_saturadas": {
      "value_100g": "valor",
      "unit": "g"
    },
    "gorduras_trans": {
      "value_100g": "valor",
      "unit": "g"
    },
    "fibras_alimentares": {
      "value_100g": "valor",
      "unit": "g"
    },
    "sodio": {
      "value_100g": "valor",
      "unit": "mg"
    }
  },
  "notes": "notas adicionais (ex.: 'Não contêm quantidades significativas de...')"
}
Se houver mais informações nutricionais, adicione-as seguindo o formato do json acima.
"""}
    ],
    image=local_image
)
print("Response for local image:")
print(response_local.choices[0].message.content)
local_image.close()