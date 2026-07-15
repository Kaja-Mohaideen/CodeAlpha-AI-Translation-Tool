function copyToClipboard(content) {
    navigator.clipboard.writeText(content).then(() => {
        alert("Text copied successfully!");
    }).catch(() => {
        alert("Failed to copy text.");
    });
}

function playSpeech(content, language = "en") {
    if (!("speechSynthesis" in window)) {
        alert("Speech synthesis not supported in this browser.");
        return;
    }

    const speaker = window.speechSynthesis;
    let availableVoices = speaker.getVoices();

    if (availableVoices.length === 0) {
        speaker.onvoiceschanged = () => {
            availableVoices = speaker.getVoices();
            triggerSpeech(content, language, availableVoices);
        };
    } else {
        triggerSpeech(content, language, availableVoices);
    }
}

function triggerSpeech(content, language, availableVoices) {
    const utter = new SpeechSynthesisUtterance(content);

    let chosenVoice = availableVoices.find(v => v.lang.toLowerCase().startsWith(language.toLowerCase()));
    if (!chosenVoice) {
        chosenVoice = availableVoices.find(v => v.lang.startsWith("en")) || availableVoices[0];
    }

    utter.voice = chosenVoice;
    utter.rate = 1.1;
    utter.pitch = 1.2;
    window.speechSynthesis.speak(utter);
}
