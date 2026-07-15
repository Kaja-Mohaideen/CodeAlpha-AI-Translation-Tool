from deep_translator import GoogleTranslator

def run_translation(content, from_lang="auto", to_lang="en"):
    try:
        translated = GoogleTranslator(source=from_lang, target=to_lang).translate(content)
        return translated
    except Exception as error:
        return f"Translation failed: {str(error)}"

def list_languages():
    translator = GoogleTranslator(source="auto", target="en")
    return translator.get_supported_languages(as_dict=True)
