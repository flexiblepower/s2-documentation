_:
    just --list

generate-structured-documentation:
    @[[ "$(read -e -p 'Overwrite existing documentation? [y/N]> '; echo $REPLY)" == [Yy]* ]] && cd structured-documentation-generator && cargo run --release

generate-website:
    cd website-generator && cargo run --release

deploy:
    cd website && npm run deploy