# What is LLM ?

**LLM** stands for **Large Language Model**. It is an AI model trained on large volumes of structured and unstructured data collected from the internet.

**How it stores information:**
Unlike a regular database that stores raw data in tables or records, an LLM processes and stores knowledge in the form of **tokens**. A token is a small unit of text — roughly a word or part of a word. During training, the model assigns a **weight** (a numerical value representing importance) to each token, allowing it to understand relationships between words and concepts.

**How it responds to a prompt:**
When a user sends a prompt, the LLM does not look up a stored answer. Instead, it:
1. Breaks the prompt into tokens.
2. Matches those tokens against patterns learned during training.
3. Uses the token weights to predict and generate the most relevant response.
4. Returns the response as a sequence of matched and generated tokens decoded back into readable text. 

"Playwright is awesome"

["Play", "wright", " is", " awesome"]

# RAG (Retrieval Augmented Generation )
RAG is always going to retrieve the relevant data from your database. 
Later, it can actually generate the customized answer with the help of LLM. 

User Input  --> It will search relevant documents from the LLM -> It will match the data -> Send question/input  to the LLM -> LLM will generate a context-based answer. 

nomic-embeded-text


# MCP (Model Context Protocol )

MCP is a standard protocol that allows AI models to communicate with external tools, applications, databases, browsers, and services. 

For example, in Playwright MCP 

When the user is going to provide all the instructions, Playwright MCP is going to connect with one of the LLMs. It is going to understand completely what needs to be done. By using predefined methods and protocols, it is going to launch the browser and it is going to finish the task. 

