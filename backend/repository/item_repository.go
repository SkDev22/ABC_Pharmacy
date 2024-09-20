package repository

import (
	"backend/models"
	"database/sql"
)

type ItemRepository struct {
	DB *sql.DB
}

// get all items
func (repo *ItemRepository) GetAllItems() ([]models.Item, error) {
	rows, err := repo.DB.Query("SELECT id, name, unit_price, category FROM items")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []models.Item
	for rows.Next() {
		var item models.Item
		if err := rows.Scan(&item.ID, &item.Name, &item.UnitPrice, &item.Category); err != nil {
			return nil, err
		}
		items = append(items, item)
	}
	return items, nil
}

// create item
func (repo *ItemRepository) CreateItem(item *models.Item) error {
	err := repo.DB.QueryRow("INSERT INTO items(name, unit_price, category) VALUES($1, $2, $3) RETURNING id",
		item.Name, item.UnitPrice, item.Category).Scan(&item.ID)
	return err
}

// update item
func (repo *ItemRepository) UpdateItem(item *models.Item) error {
	_, err := repo.DB.Exec("UPDATE items SET name=$1, unit_price=$2, category=$3 WHERE id=$4",
		item.Name, item.UnitPrice, item.Category, item.ID)
	return err
}

// delete item
func (repo *ItemRepository) DeleteItem(id int) error {
	_, err := repo.DB.Exec("DELETE FROM items WHERE id=$1", id)
	return err
}

// get an item by ID
func (repo *ItemRepository) GetItemByID(id int) (*models.Item, error) {
	var item models.Item
	err := repo.DB.QueryRow(
		"SELECT id, name, unit_price, category FROM items WHERE id = $1", id,
	).Scan(&item.ID, &item.Name, &item.UnitPrice, &item.Category)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, err
		}
		return nil, err
	}
	return &item, nil
}