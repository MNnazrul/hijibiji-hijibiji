import asyncio

async def fun():
    await asyncio.sleep(3)
    return {
        "message": "Database query"
    }

async def main():
    result = await fun()
    return result

print(asyncio.run(main()))
