# About
This is an ML library I made with various classical models as well as a loaded pretrained language model. This is not meant to compete with Pytorch or Tensorflow. It is for learning purposes.

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
I had little experience with machine learning. I wanted something to make that would help me understand the foundations in a progressive way.


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

I decided not to template these because it would add extra compile time.

## Matrix<T>
Everything in the library is a Matrix<T>. I represent these using a flat vector, so everything is contiguous (important for SIMD and general performance). operator()(i,j) indexes m_data[i * m_cols + j]. Is the class too large? Yes. Gaussian elminination, determinants, and inverses are unecessary but I did it for learning.

### Why not Tensors?
I was just unaware. If I implemented this again I would definitely use tensors.

# Llama Loading
I used Llama 3.2-1B Instruct on a GGUF format. I did use some AI assistance for the implementation, though I have a general understanding of the process:

1. Parse the GGUF container
    - GGUFFile::load() reads all necessary metadata/data
2. Dequantize
    - loadTensor<T>() handles 7 encodings.
    - More stuff here. Not sure
3. Map weights onto architecture
    - Metadata from the GGUF file is converted into a TransformerConfig
    - More stuff ehre. Not sure
4. Generation
    - Transformer<T>::generate() is a standard autoregressive loop.
    1. First phase is Prefill
        1. Embedding layer converts prompt to semantic vectors
        2. Initialize KV Cache.
        3. Casual masking
        4. Logits are extracted
    2. Second phase is Decoding
        1. Sampling converts vocabulary logits into a discrete token ID
        2. Only the newest token is embedded
        3. The KV Cache is then appended
            - The layer computes a new Query, Key, and Value
            - New Key and Values are appended to the existing cache
            - The query Q attends to the entire history
        4. Iteration stops if a stop token is emitted or limit is reached

There are 3 forward methods on my AttentionLayer
- forward() is for training and caches input, Q, K, V, and attention weights
- forward_prefill() only fills KV cache
- forward_cached() is for inference


# Biggest Accomplishment
My biggest accomplishment was getting the language model to run at all.

# Biggest Obstacle
Manual backpropogation was a really big pain to deal with. I have a greater appreciation for autograd now.

## Takeaways
This project helped me with:
- Learning general machine learning concepts
- Practicing low level programming work

