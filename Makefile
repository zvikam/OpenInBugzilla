PACKAGE_VERSION = 1.1.0
BUILD_NUMBER = 4
PACKAGE_VERSION_FULL = $(PACKAGE_VERSION).$(BUILD_NUMBER)

OUTPUT = \
	OpenInBugzilla-$(PACKAGE_VERSION_FULL).crx

DESTDIR =

NPAPI_SDK_CFLAGS = -I/usr/include/npapi-sdk

.PHONY: $(patsubst %.crx,%.force,$(OUTPUT))
.SUFFIXES: .in .crx .force

all:	\
	$(OUTPUT)

clean:
	-rm -fr tmp
	-rm -f $(OUTPUT)

install:	all
	[ -n "$(DESTDIR)" ]
	mkdir -p "$(DESTDIR)"
	cp $(OUTPUT) "$(DESTDIR)"

.force.crx:
	-rm -fr tmp
	mkdir tmp
	cp -r src/`echo "$<" | sed 's/-[0-9].*//'`/* tmp
	sed -i 's/\("version": "\)\(.*\)\("\)/\1$(PACKAGE_VERSION_FULL)\3/' tmp/manifest.json
	find tmp -name '.svn' | xargs rm -fr
#	chromium --pack-extension=tmp --pack-extension-key=key.pem --no-message-box
	./crxmake.sh tmp `echo "$<" | sed 's/-[0-9].*//'`.pem
	mv tmp.crx "$@"
	rm -fr tmp

.in:
	sed 's/@PACKAGE_VERSION_FULL@/$(PACKAGE_VERSION_FULL)/g' $< > $@
