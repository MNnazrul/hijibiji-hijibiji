from openai import OpenAI

base_url = "https://api.aimlapi.com/v1"
api_key = "afcc57bf2e324544b5cebda3813b0a8b"

api = OpenAI(api_key=api_key, base_url=base_url)


def chat_with_gpt(prompt):
    response = api.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
        max_tokens=256,
    )
    return response.choices[0].message.content.strip()



if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["quit"]:
            break
        response = chat_with_gpt(user_input)
        print("Chatbot: ", response)