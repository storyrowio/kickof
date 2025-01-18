package models

type BlogPost struct {
	Id        string `json:"id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	Slug      string `json:"slug"`
	BasicDate `bson:",inline"`
}

type BlogTopic struct {
	Id        string `json:"id"`
	Topic     string `json:"topic"`
	BasicDate `bson:",inline"`
}
