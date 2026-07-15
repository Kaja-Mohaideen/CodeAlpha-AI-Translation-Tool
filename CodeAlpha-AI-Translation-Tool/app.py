from flask import Flask, render_template, request
from translator import run_translation, list_languages

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def translator_page():
    translated_text = None
    to_lang = None
    languages = list_languages()

    if request.method == "POST":
        input_text = request.form.get("input_text")
        from_lang = request.form.get("from_lang")
        to_lang = request.form.get("to_lang")
        translated_text = run_translation(input_text, from_lang, to_lang)

    return render_template(
        "index.html",
        translated_text=translated_text,
        languages=languages,
        to_lang=to_lang
    )

if __name__ == "__main__":
    app.run(debug=True)
