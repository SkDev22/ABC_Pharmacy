package config

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

func ConnectDB() *sql.DB {
	connStr := "user=postgres dbname=pharmacy sslmode=disable password=SahanPG"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Error connecting to the database:", err)
	}
	if err = db.Ping(); err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}
	log.Println("Connected to the database successfully!")
	return db
}
