# Brainrot API

API para enviar dados do Roblox para o Discord sem usar webhook direto no jogo.

## Endpoint

POST /send  
Envie um JSON assim:

```
{
  "serverId": "id do servidor",
  "message": "mensagem formatada",
  "entries": [
    {
      "displayName": "Item",
      "rarity": "Secret",
      "value": 10000000
    }
  ]
}
```

A API retorna:
- enviado
- duplicado
