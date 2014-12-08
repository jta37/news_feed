CREATE DATABASE daily_planet;

\c daily_planet

CREATE TABLE articles (
        id serial primary key,
        title text,
        summary text
    );

INSERT INTO articles (title, summary)
    VALUES ('WDI in a Nut Shell', 'We will never know everything, we will always forget, learn to google and ask the right questions.');

INSERT INTO articles (title, summary)
    VALUES ('San Francisco', 'My expert opinion on why you should want to live in this incredible city.');