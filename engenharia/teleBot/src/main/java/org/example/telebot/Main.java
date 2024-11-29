package org.example.telebot;

import org.telegram.telegrambots.longpolling.TelegramBotsLongPollingApplication;

public class Main {
    public static void main(String[] args) {
        //nome do bot DamedoBot
        String botToken = "7394022165:AAHwWuwkCvuKjmC_umAxPuondJhwA1R2Ntw";

        try (TelegramBotsLongPollingApplication botsApplication = new TelegramBotsLongPollingApplication()) {
            botsApplication.registerBot(botToken, new SF21Bot(botToken));
            System.out.println("Bot successfully started!");
            Thread.currentThread().join();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
