import io.github.ollama4j.exceptions.OllamaBaseException;
import org.telegram.telegrambots.client.okhttp.OkHttpTelegramClient;
import org.telegram.telegrambots.longpolling.util.LongPollingSingleThreadUpdateConsumer;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.meta.generics.TelegramClient;

import java.io.IOException;

public class damedoBot implements LongPollingSingleThreadUpdateConsumer {
    private final TelegramClient telegramClient;
    Ollama ollama = new Ollama();

    public damedoBot(String botToken) { telegramClient = new OkHttpTelegramClient(botToken); }

    @Override
    public void consume(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String messageText = update.getMessage().getText();
            long chatId = update.getMessage().getChatId();

            // Mensagem de boas-vindas ao receber o comando /start
            if (messageText.equalsIgnoreCase("/start")) {
                SendMessage welcomeMessage = SendMessage
                        .builder()
                        .chatId(chatId)
                        .text("Olá, sou o chatbot Damedo. Como posso ajudar você?")
                        .build();
                try {
                    telegramClient.execute(welcomeMessage);
                } catch (TelegramApiException e) {
                    e.printStackTrace();
                }
                return; // Evita processar mais comandos no /start
            }

            String response;

            try {
                response = ollama.getOllamaResponse(messageText);
            } catch (IOException | OllamaBaseException | InterruptedException e) {
                throw new RuntimeException(e);
            }

            SendMessage message = SendMessage
                    .builder()
                    .chatId(chatId)
                    .text(response)
                    .build();
            try {
                telegramClient.execute(message);
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        }
    }
}
