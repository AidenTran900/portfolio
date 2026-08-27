# About
ChromaClash is a 2.5d fighting game (like Street Fighter) made in Lua. It features 3 characters with unique movesets and functioning rollback netcode.

# Rollback Netcode
I designed my own rollback networking system for this game, as there were no publicly available solutions for the language. Read more about it [Here.](https://aidentran.dev/posts/rollback-netcode). 

## TDLR
The clients connect with P2P using a handshake protocol. Once connected, clients send their inputs every frame through UDP packets. Each client simulates their own game. If a client doesn't have the remote client's inputs for their specific frame yet (caused by latency), they will use the remote client's last input. Once that input is recieved, the client will "roll back" to the "predicted state" and resimulate with the new inputs. There is also a lot of synchronization logic to ensure that clients don't simulate frames too far from each other. For example, slowing down a client's simulation so that the remote client can catch up.

# Code Design
I started development with networking in mind, ensuring everything was deterministic. First, I first created a central 'GameState' table, storing all relevant data for the current game session. Given this state, I decided to use an [Entity Component System (ECS)](https://en.wikipedia.org/wiki/Entity_component_system) to control game behaviors.

## Entity Component System
An entity component system consists of 3 ideas: entities, components, and systems.
### Entity
An entity is a general object, which consists of components. Usually the entity only has a unique ID. In ChromaClash, this obviously means the player characters.
### Component
A component provides specific attributes/data for an entity. For example, if you wanted an entity to take damage, you could create a Health component.
### Systems
These are things that control entity components. In ChromaClash, this could mean an 'InputManager' which changes an entity state (i.e Idle -> Light Attack) given a specific input. Another example is a 'PhysicsManager' which controls a physics component.


### Takeaways
This project helped me with:
- Learning with to make a robust realtime networking solution.
- Focusing on scalable systems at the beginning of a project
