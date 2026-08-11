_:
    just --list

generate-website:
    cd website-generator && cargo run --release
