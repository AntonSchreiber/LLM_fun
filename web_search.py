from tavily import TavilyClient
API_KEY = "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"

# Step 1. Instantiating your TavilyClient
tavily_client = TavilyClient(api_key=API_KEY)

# Step 2. Executing a simple search query
response = tavily_client.search(query="Who is Leo Messi?")

# Step 3. That's it! You've done a Tavily Search!
print(response)