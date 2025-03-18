_:
    just --list

generate-structured-documentation:
    @[[ "$(read -e -p 'Overwrite existing documentation? [y/N]> '; echo $REPLY)" == [Yy]* ]] && cd structured-documentation-generator && cargo run

generate-website:
    cd website-generator && cargo run

deploy:
    cd website && npm run deploy