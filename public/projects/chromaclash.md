# About
ChromaClash is a 2.5d fighting game (like Street Fighter) made in Roblox/Luau. It features 3 characters with unique movesets and functioning rollback netcode.

# Why?
I was fascinated at the complexity of fighting games, as well as the systems behind them.

# Why Roblox?
Ok yeah, Roblox is obviously a very bad engine to use for this type of game. My main reasons are:
- I was just used to it. I started with Roblox at a very young age.
- A really easy language (Luau)
- Publicity. I had a previous audience and it's generally easier to get Roblox players. Additionally, making such a complex game in Roblox gives a "shock factor."

Would I develop another game in Roblox? No. More on that in [Future](#the-future)...

# Rollback Netcode
I designed my own rollback networking system for this game, as there were no publicly available solutions for the language. Read more about it [Here.](https://aidentran.dev/posts/rollback-netcode).

## TDLR
The clients connect with P2P using a handshake protocol. Once connected, clients send their inputs every frame through UDP packets. Each client simulates their own game. If a client doesn't have the remote client's inputs for their specific frame yet (caused by latency), they will use the remote client's last input. Once that input is recieved, the client will "roll back" to the "predicted state" and resimulate with the new inputs. There is also a lot of synchronization logic to ensure that clients don't simulate frames too far from each other. For example, slowing down a client's simulation so that the remote client can catch up.

# Code Design
I started development with networking in mind, ensuring everything was deterministic. First, I first created a central 'GameState', storing all relevant data for the current game session. Given this state, I decided to use an [Entity Component System (ECS)](https://en.wikipedia.org/wiki/Entity_component_system) to control game behaviors.

## Entity Component System
An entity component system consists of 3 ideas: entities, components, and systems.
### Entity
An entity is a general object, which consists of components. Usually the entity only has a unique ID. In ChromaClash, this obviously means the player characters.
### Component
A component provides specific attributes/data for an entity. For example, if you wanted an entity to take damage, you could create a Health component.
### Systems
These are things that control entity components. In ChromaClash, this could mean an 'InputManager' which changes an entity state (i.e Idle -> Light Attack) given a specific input. Another example is a 'PhysicsManager' which controls a physics component.

# Biggest Accomplishment
While it is not currently open, my biggest accomplishment was being able to release the game for testing, and have people actually play the game and give feedback. Another thing was achieving some popularity, getting 500k+ impressions.

# Biggest Obstacle
The biggest obstable is of course - rollback netcode... I had a really difficult time fixing off-by-one errors and general desyncs (more on my [blog](https://aidentran.dev/posts/rollback-netcode)). This was especially true given how slow it took to startup multi-client sessions in Roblox.

## Takeaways
This project helped me with:
- Learning with to make a robust realtime networking solution.
- Focusing on scalable systems at the beginning of a project.
- Creating an end-to-end project composed of various systems.

# The Future
I don't find it worth my time to develop in such an engine anymore, especially with Roblox's reputation. Creating content was especially difficult given the restrictions (age restrictions, moderation, no version control). Ultimately, recreating this game in the Godot game engine would be my next step. I have used Godot and I really love how intuitive, light, and customizable the engine is.


Wait.. one more thing!

# Art Direction

I wanted to keep things faithful to the Roblox "style", so I opted for the classic blocky characters with some extra stuff. I also added fingers; the majority consensus was that it looked uncanny, though I didn't mind it. Maybe a bad descision. Anyways here are my character concepts:

![Lucas Concept](/images/projects/chromaclash/Lucas.png "40%")
![Celene Concept](/images/projects/chromaclash/Celene.png "40%")
![Silas Concept](/images/projects/chromaclash/Silas.png "40%")

I also worked on new character designs for the Godot version for a brief time. Here is the new and improved Lucas, modeled by yours truly:
![Lucas New Concept](/images/projects/chromaclash/LucasNew.png "48%")
![Lucas Idle](/images/projects/chromaclash/LucasNew2.png "48%")


