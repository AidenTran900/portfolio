# About
A C++ machine learning library built from the ground up implementing various ML algorithms and models. The whole point of this is for me to better understand machine learning at a lower level.

**Disclaimer:** I am not going to pretend like I did everything myself. AI was used in the creation of CUDA code, GGUF/LLama loaders, python bindings, and template metaprogramming. **I did this because my main focus was implementation of ML models.** In the future I will definitely learn more CUDA.


## Models include:
- Linear regression
- Logistic regression
- K nearest neighbors
- Support vector machines
- Descision trees
- Random forests
- K means clustering
- Neural networks
- Residual netowrks (ResNet)
- Transformer
- Perceptron


# Why?
I had little experience with machine learning. I wanted something to make that would help me understand the foundations in a progressive, unabstracted way.


# Code Architecture
The library is a strict dependency stack, meaning that each layer relies on a lower layer. For example, a transformer is built using a feedforward network object.

Each component of the library is based on 4 abstract base classes with factory functions. 
- LossFunction<T>
- Optimizer<T>
- Regularizer<T>
- Model

### Caveats
If a parameter matrix is moved/reallocated, the address will change and the optimizer loses its state. I would have to assign an integer ID on registration to fix this.

## Models
There are two types of models:
- GradientModelInterface<T>:
    - forward / backward / update methods
    - Used for iterative training
- FitPredictModel
    - fit / predict
    - Used by KNN, SVM, decision trees, random forests, and K means

## Matrix<T>
Everything in the library is a Matrix<T>. I represent these using a flat vector, so everything is contiguous (important for SIMD and general performance). operator()(i,j) indexes m_data[i * m_cols + j]. Is the class too large? Yes. Gaussian elminination, determinants, and inverses are unecessary but I did it for learning.

### Why not Tensors?
I was just unaware and did not generalize into higher dimensionality. If I implemented this again I would definitely implement tensors instead.

# Biggest Accomplishment
My biggest accomplishment was getting the language model to run at all.

# Biggest Obstacle
Manual backpropogation was a really big pain to deal with. I have a greater appreciation for autograd now.

## Takeaways
This project helped me understand the inner workings of systems and components in machine learning, as well as their relationships with each other. I learned how to take a simple Matrix implementation and expand it into a vast library. While this project taught me a lot, *it is also very reductionist*. I will learn and practice using/evaluating these models in future work.
