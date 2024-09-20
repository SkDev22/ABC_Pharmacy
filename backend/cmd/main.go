package main

import (
	"backend/config"
	"backend/routes"
	"log"
	"net/http"

	"github.com/rs/cors"
)

func main() {
    db := config.ConnectDB()
    defer db.Close()

    r := routes.InitializeRoutes(db)

    c := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:5173"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders:   []string{"Content-Type", "Authorization"},
        AllowCredentials: true,
    })

    handler := c.Handler(r)

    log.Println("Server starting on port 8000...")
    log.Fatal(http.ListenAndServe(":8000", handler))
}
