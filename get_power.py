with open("script.js", "r") as f:
    js = f.read()

start = js.find("function useHeroPower()")
end = js.find("}", js.find("}", js.find("}", js.find("}", start) + 1) + 1) + 1) + 1 # Hacky way to grab the function body
print(js[start:start+1000])
